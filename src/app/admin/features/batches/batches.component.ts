import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { BatchesService } from 'src/app/services/firestore/batches.service';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss'],
})
export class BatchesComponent implements OnInit {
  constructor(
    private ngbModal: NgbModal,
    private fb: FormBuilder,
    private batchSvc: BatchesService
  ) {}

  editMode: boolean = false;
  batchId: string | null = null;
  weekDays: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  batches: any[] = [];
  batchStatus: 'fetching' | 'done' | 'error' = 'fetching';
  batchForm = this.fb.group({
    batchName: new FormControl('', Validators.required),
    weekDayForm: this.fb.group({
      mondayStartTime: new FormControl(''),
      tuesdayStartTime: new FormControl(''),
      wednesdayStartTime: new FormControl(''),
      thursdayStartTime: new FormControl(''),
      fridayStartTime: new FormControl(''),
      saturdayStartTime: new FormControl(''),
      sundayStartTime: new FormControl(''),
      mondayEndTime: new FormControl(''),
      tuesdayEndTime: new FormControl(''),
      wednesdayEndTime: new FormControl(''),
      thursdayEndTime: new FormControl(''),
      fridayEndTime: new FormControl(''),
      saturdayEndTime: new FormControl(''),
      sundayEndTime: new FormControl(''),
      isMondayHoliday: new FormControl(false),
      isTuesdayHoliday: new FormControl(false),
      isWednesdayHoliday: new FormControl(false),
      isThursdayHoliday: new FormControl(false),
      isFridayHoliday: new FormControl(false),
      isSaturdayHoliday: new FormControl(false),
      isSundayHoliday: new FormControl(false),
    }),
  });

  ngOnInit() {
    this.getBatches();
  }

  getBatches() {
    this.batchStatus = 'fetching';
    this.batches = [];
    // this.appSvc.getBatches().subscribe({
    //   next: (data: any) => {
    //     if (typeof data === 'object') {
    //       this.batches = data;
    //       this.batchStatus = 'done';
    //     } else {
    //       this.batchStatus = 'error';
    //     }
    //   },
    //   error: (_err) => {
    //     this.batchStatus = 'error';
    //   },
    // });
    this.batchSvc.getBatches().subscribe({
      next: (data: any) => {
        if (typeof data === 'object') {
          this.batches = data;
          console.log(data);
          this.batchStatus = 'done';
        } else {
          this.batchStatus = 'error';
        }
      },
      error: (_err) => {
        this.batchStatus = 'error';
      },
    });
  }

  openFormModal(dialogRef: any) {
    // this.formModal.show();
    let modalRef = this.ngbModal.open(dialogRef, {
      size: 'lg',
      centered: true,
    });

    modalRef.dismissed.subscribe({
      next: (_r: any) => {
        this.editMode = false;
        this.batchForm.reset();
        // this.batchForm.clearValidators()
        console.log('dismissed');
      },
    });
    modalRef.closed.subscribe({
      next: (_r: any) => {
        this.editMode = false;
        this.batchForm.reset();
        console.log('closed');
      },
    });
  }
  saveSomeThing() {
    // confirm or save something
    // this.formModal.hide();
  }

  addBatch(editmode = false) {
    this.batchForm.valid;
    console.log(this.batchForm.value);
    let weekDay: any[] = [];
    this.weekDays.forEach((day: string) => {
      let weekObj = {
        day: day,
        startTime: this.batchForm.get([
          'weekDayForm',
          day.toLowerCase() + 'StartTime',
        ])?.value,
        endTime: this.batchForm.get([
          'weekDayForm',
          day.toLowerCase() + 'EndTime',
        ])?.value,
        isHoliday: this.batchForm.get(['weekDayForm', 'is' + day + 'Holiday'])
          ?.value,
      };
      weekDay.push(weekObj);
    });
    let reqBody: any = {
      batchName: this.batchForm.get('batchName')?.value,
      weekDay: weekDay,
    };
    // this.appSvc.saveBatch(reqBody).subscribe({
    //   next: (resp: any) => {
    //     this.batchForm.reset();
    //     console.log('batch added successfully');
    //     this.getBatches();
    //     this.ngbModal.dismissAll();
    //   },
    //   error: (_err) => {
    //     console.log('batch added failed');
    //   },
    // })(;
    if (editmode) {
      reqBody = {
        batchId: this.batchId,
        ...reqBody,
      };
      this.batchSvc
        .updateBatch(reqBody, this.batchId || '')
        .then(() => {
          this.batchForm.reset();
          this.getBatches();
          this.ngbModal.dismissAll();
          alert('Batch edited!')
        })
        .catch((err: any) => {
          console.log(err)
          console.log('something went wrong');
        });
    } else {
      reqBody = {
        batchId: new Date().getTime(),
        ...reqBody,
      };

      this.batchSvc
        .createBatch(reqBody)
        .then(() => {
          this.batchForm.reset();
          this.getBatches();
          this.ngbModal.dismissAll();
          alert('Batch added!')
        })
        .catch(() => {
          console.log('something went wrong');
        });
    }

    console.log(reqBody);
  }

  disableStartAndEndTimeFields(day: string) {
    let checked =
      this.batchForm.get(['weekDayForm', 'is' + day + 'Holiday'])?.value ||
      false;
    console.log(checked);
    // let startTimeId = day.toLowerCase() + 'StartTime';
    // let checked = this.batchForm.get([
    //   'weekDayForm',
    //   'is'+day + 'Holiday',
    // ])?.value || false
    // let endTimeId = day.toLowerCase() + 'EndTime';
    if (checked) {
      this.batchForm
        .get(['weekDayForm', day.toLowerCase() + 'StartTime'])
        ?.disable();
      this.batchForm
        .get(['weekDayForm', day.toLowerCase() + 'EndTime'])
        ?.disable();

      //   this.batchForm.get(startTimeId)?.disable();
      //   this.batchForm.get(endTimeId)?.disable();
    } else {
      this.batchForm
        .get(['weekDayForm', day.toLowerCase() + 'EndTime'])
        ?.enable();

      this.batchForm
        .get(['weekDayForm', day.toLowerCase() + 'StartTime'])
        ?.enable();
      //   this.batchForm.get(startTimeId)?.enable();
      //   this.batchForm.get(endTimeId)?.enable();
    }
  }

  deleteBatch(batchId: string) {
    this.batchStatus = 'fetching';
    // this.appSvc.deleteBatch(batchId).subscribe({
    //   next: () => {
    //     this.getBatches();
    //   },
    //   error: () => {
    //     this.batchStatus = 'error';
    //   },
    // });
    this.batchSvc.deleteBatch(batchId).then((v)=>{
      this.getBatches()
      alert('Batch deleted!')
    }).catch(()=>{
      this.batchStatus = 'error'
    })
  }

  editBatch(batch: any, dialogRef: any) {
    this.editMode = true;
    console.log(batch);
    this.batchId = batch.batchId;
    this.batchForm.get('batchName')?.setValue(batch.batchName);
    batch.weekDay.forEach((dayObj: any) => {
      let day = dayObj.day;
      this.batchForm
        .get(['weekDayForm', day.toLowerCase() + 'StartTime'])
        ?.setValue(dayObj.startTime);

      this.batchForm
        .get(['weekDayForm', day.toLowerCase() + 'EndTime'])
        ?.setValue(dayObj.endTime);

      if (
        dayObj.isHoliday ||
        (dayObj.startTime === '' && dayObj.endTime === '')
      ) {
        this.batchForm
          .get(['weekDayForm', day.toLowerCase() + 'StartTime'])
          ?.disable();
        this.batchForm
          .get(['weekDayForm', day.toLowerCase() + 'EndTime'])
          ?.disable();

        this.batchForm
          .get(['weekDayForm', 'is' + day + 'Holiday'])
          ?.setValue(true);
      }
    });
    let modalRef = this.ngbModal.open(dialogRef, {
      size: 'lg',
      centered: true,
    });

    modalRef.dismissed.subscribe({
      next: (_r: any) => {
        this.editMode = false;
        this.batchForm.reset();
        // this.batchForm.clearValidators()
        console.log('dismissed');
      },
    });
    modalRef.closed.subscribe({
      next: (_r: any) => {
        this.editMode = false;
        this.batchForm.reset();
        console.log('closed');
      },
    });
    // alert('fuctionality coming soon, kindly delete and add a batch.');
  }

  sameTimeAsMonday() {
    let mondayStartTime =
      this.batchForm.get(['weekDayForm', 'mondayStartTime'])?.value || null;
    let mondayEndTime =
      this.batchForm.get(['weekDayForm', 'mondayEndTime'])?.value || null;
    if (mondayEndTime && mondayStartTime) {
      this.weekDays.forEach((w) => {
        this.batchForm
          .get(['weekDayForm', w.toLowerCase() + 'StartTime'])
          ?.setValue(mondayStartTime);
        this.batchForm
          .get(['weekDayForm', w.toLowerCase() + 'EndTime'])
          ?.setValue(mondayEndTime);
      });
    } else alert('Enter start and end time in monday field first.');
    console.log(mondayStartTime);
  }
}

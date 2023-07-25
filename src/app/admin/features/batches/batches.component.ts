import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app-service.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss'],
})
export class BatchesComponent implements OnInit {
  constructor(
    private appSvc: AppService,
    private ngbModal: NgbModal,
    private fb: FormBuilder
  ) {}
  weekDays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
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
    this.getBatches()
  }

  getBatches(){
    this.batchStatus = 'fetching'
    this.batches =[]
    this.appSvc.getBatches().subscribe({
      next: (data: any) => {
        if (typeof data === 'object') {
          this.batches = data;
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

  openFormModal(content: any) {
    // this.formModal.show();
    this.ngbModal.open(content, { size: 'lg', centered: true });
  }
  saveSomeThing() {
    // confirm or save something
    // this.formModal.hide();
  }

  addBatch() {
    this.batchForm.valid;
    console.log(this.batchForm.value);
    let weekDay: any[] = []
    console.log(this.batchForm)
    console.log(this.batchForm.get(['weekDayForm','sundayStartTime'])?.value)
    console.log(this.batchForm.get('sundayStartTime'))
    
    this.weekDays.forEach((day: string)=>{
      let weekObj = {
        day: day,
        startTime: this.batchForm.get(['weekDayForm' ,day.toLowerCase() +'StartTime'])?.value,
        endTime: this.batchForm.get(['weekDayForm',day.toLowerCase() +'EndTime'])?.value,
        isHoliday: this.batchForm.get(['weekDayForm','is'+ day + 'Holiday'])?.value
      }
      weekDay.push(weekObj)
    })
    let reqBody = {
      batchId: new Date().getTime(),
      batchName: this.batchForm.get('batchName')?.value,
      weekDay: weekDay,
    };
    this.appSvc.saveBatch(reqBody).subscribe({next: (resp:any)=>{
      this.batchForm.reset()
      console.log('batch added successfully')
      
      this.getBatches()
      this.ngbModal.dismissAll()
    }, error: (_err)=>{
      console.log('batch added failed')
    }})
    console.log(reqBody);
  }

  disableStartAndEndTimeFields(day: string, checked: boolean){
    let startTimeId = day.toLowerCase() + 'StartTime'
    let endTimeId = day.toLowerCase() + 'EndTime'
    if(checked){
      this.batchForm.get(startTimeId)?.disable()
      this.batchForm.get(endTimeId)?.disable()
    } else {
      this.batchForm.get(startTimeId)?.enable()
      this.batchForm.get(endTimeId)?.enable()
    }
  }

  deleteBatch(batchId: string){
    this.batchStatus = 'fetching'
      this.appSvc.deleteBatch(batchId).subscribe({next:()=>{
        this.getBatches()
      }, error: ()=>{
        this.batchStatus ='error'
      }})
  }

  editBatch(batch: any){
    alert('fuctionality coming soon, kindly delete and add a batch.')
  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app-service.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.scss']
})
export class NoticesComponent implements OnInit {

  constructor(
    private appSvc: AppService,
    private ngbModal: NgbModal,
    private fb: FormBuilder
  ) {}


  public Editor = ClassicEditor;
  noticeStatus: 'fetching' | 'done' | 'error' = 'fetching';
  editMode: boolean = false
  notices: any[] = []
  noticeForm = this.fb.group({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.getBatches()
  }

  openFormModal(dialogRef: any) {
    // this.formModal.show();
    let modalRef = this.ngbModal.open(dialogRef, { size: 'lg', centered: true });

   modalRef.dismissed.subscribe({next:(_r: any)=>{
    this.editMode = false
    this.noticeForm.reset()
    // this.noticeForm.clearValidators()
    console.log('dismissed')
   }})
   modalRef.closed.subscribe({next:(_r: any)=>{
    this.editMode = false
    this.noticeForm.reset()
    console.log('closed')
   }})
  }

  addNotice(){
    console.log(this.noticeForm.value)
    this.noticeStatus= 'fetching'
    let reqBody = {
     noticeId: new Date().getTime(),
     ...this.noticeForm.value
    }
    this.appSvc.saveNotice(reqBody).subscribe({next:(_r)=>{
      this.appSvc.appFirstTimeLoad = true
      this.ngbModal.dismissAll()
      this.getBatches()
    }})
  }

  getBatches(){
    this.notices = []
    this.noticeStatus = 'fetching'
    this.appSvc.getNotices().subscribe({next: (notices:any)=>{
      this.notices = notices
      this.noticeStatus = 'done'
    },error: (_err: any)=> {
      this.noticeStatus = 'error'
    }})
  }

  deleteNotice(noticeId: string){
    console.log(noticeId)
    this.noticeStatus = 'fetching'
    this.appSvc.deleteNotice(noticeId).subscribe({next: (_resp)=>{
      this.getBatches()
    }, error: (_e)=>{
      this.noticeStatus = 'error'
    }})
  }
}

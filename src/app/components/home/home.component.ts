import {  AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  NgbModal,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('noticeDialog') noticeDialog!: TemplateRef<any>;
  notices: any[] = []
  constructor(private appSvc: AppService, private ngbModal: NgbModal) {}
  ngAfterViewInit() {
    if(this.appSvc.appFirstTimeLoad)
    this.appSvc.getNotices().subscribe({next: (notices:any)=>{
      this.appSvc.appFirstTimeLoad = false
      this.notices = notices
      if(this.notices.length){
        this.ngbModal.open(this.noticeDialog, { size: 'lg', centered: true } )
      }
      console.log(notices)
    }})
  }

  
}

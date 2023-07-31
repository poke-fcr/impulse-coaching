import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NoticesService } from 'src/app/services/firestore/notices.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('noticeDialog') noticeDialog!: TemplateRef<any>;
  notices: any[] = [];
  constructor(private ngbModal: NgbModal, private noticeSvc: NoticesService) {}

  ngAfterViewInit() {
    if (!this.noticeSvc.noticeLoaded)
      this.noticeSvc.getNotices().subscribe({
        next: (notices: any) => {
          this.noticeSvc.noticeLoaded = true;
          this.notices = notices;
          if (this.notices.length) {
            this.ngbModal.open(this.noticeDialog, {
              size: 'lg',
              centered: true,
            });
          }

          console.log(notices);
        },
      });
  }
}

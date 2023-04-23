import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements AfterViewInit {
  
  constructor(private activatedRoute: ActivatedRoute){}
  
  ngAfterViewInit(): void {
    this.activatedRoute.queryParamMap.subscribe(param =>{
      if(param.get('queryForm')){
        setTimeout(()=>{
          let queryFormId = document.getElementById('queryForm')
          var headerOffset = 50;
          var elementPosition = queryFormId?.getBoundingClientRect().top;
          var offsetPosition = (elementPosition || 0) + window.pageYOffset - headerOffset;
        
          window.scrollTo({
               top: offsetPosition,
               behavior: "smooth"
          });
        },1500)
       
      }
      else {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
     });
      }
    })
  }

}

import { Component, OnInit ,OnDestroy} from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit ,OnDestroy {

  constructor(private _AuthService:AuthService) {

     this.sub= _AuthService.currentUser.subscribe(()=>{
       
        this.user=this._AuthService.currentUser.getValue()

      })
    
    
  }
  
    user :any
    sub:any;
    name:string='';
    age:number=0;;
    email:string='';
    role:string='';
     
    ngOnInit(): void { 
    this.email=this.user.emai;
    this.name=this.user.name;
    this.age=this.user.age;
    this.role=this.user.role;
    
  }

  ngOnDestroy():any{
    this.sub.unsubscribe();
  }

}

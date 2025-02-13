import { Component,EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConsoleService } from '@ng-select/ng-select/lib/console.service';
import { AppComponentBase } from '@shared/app-component-base';
import { GorevDto, MusteriDashDto, MusteriDashboardServiceProxy, MusteriDto, MusteriGuncelleDto, MusteriIstekDto, MusteriServiceProxy, ProjeDto } from '@shared/service-proxies/service-proxies';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-musteri-dashboard',
  templateUrl: './musteri-dashboard.component.html',
  styleUrls: ['./musteri-dashboard.component.css']
})
export class MusteriDashboardComponent extends AppComponentBase implements OnInit {
  @Output() onSave=new EventEmitter<any>();


  projeler: ProjeDto[]=[];
  gorevler: GorevDto[]=[];
  musteriIstekleri: MusteriIstekDto[]=[];
  musteri = new MusteriDashDto;
  musteriGuncelle:MusteriGuncelleDto;
  musteribilgiler:MusteriDto[]=[];
  musteriDetails= new MusteriDto;
  countProject : number;
  countMusteriIstek: number;
  Id : number;
  constructor(
    injector:Injector,
    private router: Router,
    private _musteriServiceProxy:MusteriServiceProxy,
    private _dashboardServiceProxy : MusteriDashboardServiceProxy,
    private _modalService: BsModalService,
    ) {
   super(injector)}

  ngOnInit(){
    this._dashboardServiceProxy.getMusteriDashboardId().subscribe(
      (res)=>{
        this.musteri=res;
        console.log(res);
        console.log(this.musteri);
        const id=this.musteri.musteriId;
        this.Id=this.musteri.musteriId;
        this.getProjeler();
        this.getMusteriTalep();
        this.getMiniProfile(this.Id);
      }
      
    )
  }
  getMiniProfile( id : number){
    this.musteriGuncelle=new MusteriGuncelleDto();
    this._musteriServiceProxy.getMusteriById(id).subscribe((res)=>{
      this.musteriDetails=res;
    });
  }
  getProjeler(){
    this._dashboardServiceProxy.getMusteriDashboardProjeler().subscribe(
      (res)=>{
        this.projeler=res;
        this.countProject=this.projeler.length;
      }
    )
  }

  getMusteriTalep(){
    this._dashboardServiceProxy.getMusteriDashboardMusteriTalepler().subscribe(
      (res)=>{
        this.musteriIstekleri=res;
        this.countMusteriIstek=this.musteriIstekleri.length;
      }
    )
  }

  getMusteriBilgileri(){
    this._dashboardServiceProxy.getMusteriDashboardMusteriBilgileri().subscribe(
      (res)=>{
        this.musteribilgiler=res;
      }
    )
  }

  // sayfa yönlendirme fonksiyonları
  goMyProfile(){
    this.router.navigateByUrl('app/profile/'+this.Id+'/2');
  }
  goMyProject(){
    this.router.navigateByUrl('app/project/'+this.Id+'/2');
  }
  goMyRequest(){
    this.router.navigateByUrl('app/request/'+this.Id+'/2');
  }

}






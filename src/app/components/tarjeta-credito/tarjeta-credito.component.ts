import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  //arreglo de tarejtas
  /*lisTarjetas:any[]=[
    {titular:'Juan perez',numeroTarjeta:'123456',fechaExpiracion:'11/23',ccv:'123'},
    {titular:'omar silva',numeroTarjeta:'1234567',fechaExpiracion:'5/23',ccv:'223'},

  ];
  */

  //variables
  lisTarjetas:any[]=[];
  accion='AGREGAR';
  id:number |undefined;
  form:FormGroup;


  constructor(private fb:FormBuilder,private toastr: ToastrService,private _tarjetaService:TarjetaService) {
    this.form=this.fb.group({
      titular:['',Validators.required],
      numeroTarjeta:['',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
      fechaExpiracion:['',[Validators.required,Validators.minLength(5),Validators.maxLength(5)]],
      cvv:['',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]]
    })
   }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){ 
    this._tarjetaService.getListarTarjetas().subscribe(data =>{
      console.log(data);
      this.lisTarjetas=data;// los datos data, del backend se agregan a el arreglo
    },error=>{
      console.log(error);
    })
  }

  guardarTarjeta(){ // al dar click en el boton Aceptar se llama esta funcion
    //agregamos nueva tarjeta

      const tarjeta:any={
      titular:this.form.get('titular')?.value,
      numeroTarjeta:this.form.get('numeroTarjeta')?.value,
      fechaExpiracion:this.form.get('fechaExpiracion')?.value,
      cvv:this.form.get('cvv')?.value
    }
    if(this.id==undefined){
      console.log(this.form);
      this._tarjetaService.crearTarjeta(tarjeta).subscribe(data=>{
      this.toastr.success('La tarjeta fue registrada con exito!', 'Tarjeta Registrada!');
      this.obtenerTarjetas();
      this.form.reset()

    },error=>{
      this.toastr.error('Opss ocurrio un error...', 'Error!');
      console.log(error)

    })

    }else{
      //editamos tarjeta
        tarjeta.id=this.id;
        this._tarjetaService.actualizarTarjeta(this.id,tarjeta).subscribe(data=>{
        this.form.reset();
        this.accion='Agregar';
        this.id=undefined;
        this.toastr.info('La Tarjeta Fue Actualizada con exito', 'Tarjeta Actualizada!');
        this.obtenerTarjetas();
      },error=>{
        console.log(error);
      })
    }
    
  }
  deleteTarjeta(id:number){
    this._tarjetaService.eliminarTarjeta(id).subscribe(data=>{
      this.toastr.error("la tarjeta fue eliminada con exito!","tarjeta eliminada");
      this.obtenerTarjetas();
    },error=>{
      console.log(error);
    })
    
  }

  updateTarjeta(tarjeta:any){
    console.log(tarjeta);
    // llenar el formulario
    this.accion='Editar';
    this.id=tarjeta.id;
    this.form.patchValue({
      titular:tarjeta.titular,
      numeroTarjeta:tarjeta.numeroTarjeta,
      fechaExpiracion:tarjeta.fechaExpiracion,
      cvv:tarjeta.cvv
    })
  }

}

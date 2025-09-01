import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Item } from "../benefitGrid";
import { createPQR, TPqrs } from "@/app/service/usercases/pqr.service";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";

type Props = {
  cerrarModal : () => void;
  beneficioSeleccionado: Item;
  idUsuario : number 
};

export default function GestionPQRSModal({ cerrarModal,beneficioSeleccionado,idUsuario }: Props) {  
  const [descripcion, setdescripcion] = useState("")

  const modificardescripcion = (e:any) => {
    setdescripcion(e.target.value); 
  };

  const guardarPQR =()=> {
    var pqr:TPqrs = {
        id:0,
        description : descripcion,
        idUsuario : idUsuario,
        idBeneficio: beneficioSeleccionado.id,
        state:"Activo" // Esto no se deberia de enviar y se deberia de setear desde el api pero a este momento no existen servicios para GenericStatus
    }

    createPQR(pqr).then(()=>cerrarModal())
  }

  return (
    <div className="p-6">    
    <Dialog open={true} onOpenChange={()=>cerrarModal()} > 
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Descripcion PQR para el beneficio <b>{beneficioSeleccionado.name}</b> </DialogTitle>
          </DialogHeader>            
            <textarea
            className="w-full h-48 border rounded p-2"
            value={descripcion}
            onChange={modificardescripcion}            
        />
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="destructive" onClick={() => guardarPQR()}>Generar PQR</Button>
             <Button variant="outline" onClick={() => cerrarModal()}>Cancelar</Button>
          </DialogFooter>
        </DialogContent>      
        </Dialog>
    </div>  
  );
}



const url = "http://127.0.0.1:8000/api";

export const Bodegas = async () => {

    const fetchBodegas = await fetch(url+"/bodegas");
    const bodegasJSON = fetchBodegas.json();
    return bodegasJSON;
};

export const Marcas = async () => {

    const fetchMarcas = await fetch(url+"/marcas");
    const marcasJSON = fetchMarcas.json();
    return marcasJSON;
};

export const Modelos = async () => {

    const fetchModelos = await fetch(url+"/modelos");
    const modelosJSON = fetchModelos.json();
    return modelosJSON;
};

export const Dispositivos = async () => {

    const fetchDispositivos = await fetch(url+"/dispositivos");
    const dispositivosJSON = fetchDispositivos.json();
    return dispositivosJSON;
};

export const dispositivosBodega = async (id_bodega) => {

    if(id_bodega > 0 ){
        const fetchDispositivosBodega = await fetch(url+"/dispositivos/bodega/"+id_bodega);
        const dispositivosBodegaJSON = fetchDispositivosBodega.json();
        return dispositivosBodegaJSON;
    }else{
        return Dispositivos();
    }
    
};

export const dispositivosMarca = async (id_marca) => {
    if(id_marca > 0){
        const fetchDispositivosMarca = await fetch(url+"/dispositivos/marca/"+id_marca);
        const dispositivosMarcaJSON = fetchDispositivosMarca.json();
        return dispositivosMarcaJSON;
    }
    
};

export const dispositivosModelo = async (id_modelo) => {

    const fetchDispositivosModelo = await fetch(url+"/dispositivos/modelo/"+id_modelo);
    const dispositivosModeloJSON = fetchDispositivosModelo.json();
    return dispositivosModeloJSON;
};

export const modelosMarca = async (id_marca) => {

    const fetchModelosMarca = await fetch(url+"/modelos/marca/"+id_marca);
    const modelosMarcaJSON = fetchModelosMarca.json();
    return modelosMarcaJSON;
};

export const FiltrarDispositivos = async (id_bodega, id_marca, id_modelo) => {

    let dispositivosFiltrados = await Dispositivos()
    
    if(id_bodega > 0 ){
        dispositivosFiltrados = dispositivosFiltrados.filter(dispositivo => dispositivo.BDG_ID === id_bodega);
    }
    if(id_marca > 0 ){
        dispositivosFiltrados = dispositivosFiltrados.filter(dispositivo => dispositivo.MRC_ID === id_marca);
    }
    if(id_modelo > 0 ){
        dispositivosFiltrados = dispositivosFiltrados.filter(dispositivo => dispositivo.MDL_ID === id_modelo);
    }
    console.log(dispositivosFiltrados)
    return dispositivosFiltrados;

}

export const ingresarDispositivo = async (nombre, bodega_id, modelo_id) => {
    const Dispositivo = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "DSP_NOMBRE": nombre,
            "BDG_ID": bodega_id,
            "MDL_ID": modelo_id
        })
    }

    await fetch('http://127.0.0.1:8000/api/dispositivo', Dispositivo)
};

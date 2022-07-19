import { useState, useEffect } from "react";
import "../App.css";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
//Services
import {
  Bodegas,
  Marcas,
  Modelos,
  Dispositivos,
  modelosMarca,
  FiltrarDispositivos,
  ingresarDispositivo,
} from "../services/DispositivosServices";

export const MainPage = () => {
  const [bodegas, setBodegas] = useState([]);
  const [bodegaSeleccionada, setBodegaSeleccionada] = useState(0);

  const [marcas, setMarcas] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(0);

  const [modelos, setModelos] = useState([]);
  const [modeloSeleccionado, setModeloSeleccionado] = useState(0);

  const [dispositivos, setDispositivos] = useState([]);

  const [nombreDispositivo, setNombreDispositivo] = useState("");

  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    Bodegas().then(setBodegas);
    Marcas().then(setMarcas);
    Modelos().then(setModelos);
    Dispositivos().then(setDispositivos);
  }, []);

  const cambioBodega = (event) => {
    setBodegaSeleccionada(event.target.value);
    FiltrarDispositivos(
      event.target.value,
      marcaSeleccionada,
      modeloSeleccionado
    ).then(setDispositivos);
  };

  const cambioMarca = (event) => {
    setMarcaSeleccionada(event.target.value);

    if (event.target.value !== 0) {
      modelosMarca(event.target.value).then(setModelos);
    } else {
      Modelos().then(setModelos);
    }
    FiltrarDispositivos(bodegaSeleccionada, event.target.value, 0).then(
      setDispositivos
    );
    setModeloSeleccionado(0);
    console.log(modelos)
  };

  const cambioModelo = (event) => {
    setModeloSeleccionado(event.target.value);

    FiltrarDispositivos(
      bodegaSeleccionada,
      marcaSeleccionada,
      event.target.value
    ).then(setDispositivos);
  };

  const cambioNombre = (event) =>{
    setNombreDispositivo(event.target.value);
  }

  const ingresar = (event) =>{
    if (nombreDispositivo === "" || bodegaSeleccionada === 0 || modeloSeleccionado ===0){
      setAlert(true);
      setSuccess(false);
    }else{
      setAlert(false);
      setSuccess(true)
      ingresarDispositivo(nombreDispositivo, bodegaSeleccionada, modeloSeleccionado);
    }
    
  }

  return (
    <div>
      <h1 className="titulo">TEST PROGRAMADOR INICIAL: Ricardo Catril</h1>
      <div className="comboboxs">
      <TextField  value={nombreDispositivo} label="Nombre Dispositivo" variant="outlined" sx={{ m: 4}} onChange={cambioNombre}/>

        <FormControl sx={{ m: 4, minWidth: 400 }}>
          <InputLabel id="demo-simple-select-label">Bodega</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bodegaSeleccionada}
            label="Bodegas"
            onChange={cambioBodega}
          >
            <MenuItem value={0}>--</MenuItem>
            {bodegas.map((bodega, id) => (
              <MenuItem value={bodega.BDG_ID} key={id}>
                {bodega.BDG_NOMBRE} ID= {bodega.BDG_ID}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 4, minWidth: 400 }}>
          <InputLabel id="demo-simple-select-label">Marcas</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={marcaSeleccionada}
            label="Marcas"
            onChange={cambioMarca}
          >
            <MenuItem value={0}>--</MenuItem>
            {marcas.map((marca, id) => (
              <MenuItem value={marca.MRC_ID} key={id}>
                {marca.MRC_NOMBRE} ID= {marca.MRC_ID}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 4, minWidth: 400 }}>
          <InputLabel id="demo-simple-select-label">Modelo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={modeloSeleccionado}
            label="Modelos"
            onChange={cambioModelo}
          >
            <MenuItem value={0}>--</MenuItem>
            {modelos.map((modelo, id) => (
              <MenuItem value={modelo.MDL_ID} key={id}>
                {modelo.MDL_NOMBRE} ID= {modelo.MDL_ID}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Collapse in={alert}>
        <Alert severity="error"
          sx={{ mb: 2 }}
        >
          Asegura que los campos "Nombre Dispositivo", "Bodega" y "Modelo" estén seleccionados!
        </Alert>
      </Collapse>

      <Collapse in={success}>
        <Alert
          sx={{ mb: 2 }}
        >
          Dispositivo ingresado!
        </Alert>
      </Collapse>
      
        <Button variant="contained" onClick={ingresar} sx={{ m: 2, width: 200, fontSize: 20}}>Agregar</Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Dispositivo</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Marca</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dispositivos.map((dispositivo, id) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dispositivo.DSP_ID}
                </TableCell>
                <TableCell>{dispositivo.DSP_NOMBRE}</TableCell>
                <TableCell>{dispositivo.MDL_NOMBRE}</TableCell>
                <TableCell>{dispositivo.MRC_NOMBRE}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

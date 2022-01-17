import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
//mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';

const ViewSong = () => {
    const [songInput, setSong] = useState([]);
    const handleInput = (e) => {
        return setSong({...songInput, [e.target.name]: e.target.value});
    }
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        axios.get(`api/song`).then(res=> {
            if(res['status']===200) {
                setSongs(res.data.song);
                setLoading(false);
            }
        })
    }, []); 
    // delete function
    const deleteSong = (e,id) => {
        e.preventDefault();
        const delClick = e.currentTarget;
        axios.delete(`api/deletesong/${id}`).then(
            res => {
                if(res.data.status === 200){
                    swal('Deleted!', res.data.message);
                    delClick.closest('tr').remove();
                }
                else if(res.data.status === 404) {
                    swal(`error`, res.data.message);
                    delClick.innerText = 'Delete'
                };
            }
        );
    }
    if (loading) {
        return <h4 style={{color:'white',margin:'400px'}}>Loading Songs Data</h4>
    }
    else {
        var songs_HTMLTABLE="";
        songs_HTMLTABLE = songs.map((item, index) => {
            return (
            <tr key={index}>
                <td>{item.title}</td>
                <td>{item.artist}</td>
                <textarea class="form-control" rows="5" id="lyrics" placeholder="Lyrics?" name='lyrics' value={item.lyrics} disabled/>
                <td>
                    <abbr title="Edit">
                        <Link to={`editsong/${item.id}`} class="btn btn-secondary btn-sm"><EditIcon/></Link>
                    </abbr>
                </td>
                <td>
                    <abbr title="Delete">
                        <a class="btn btn-danger btn-sm" type="button" onClick={(e) => deleteSong(e, item.id)}><DeleteIcon/></a>
                    </abbr>
                </td>
            </tr>)
        });
    };
    return (
        
        <div>
            <TableContainer className='table table-bordered table-hover table-secondary mt-5' component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="caption table">
          <caption><Link class="btn special" to='/addsong'>Add more<AddCircleSharpIcon/></Link></caption>
          <TableHead class="table-primary table-dark">
            <TableRow>
              <TableCell align="center"sx={{color:'white'}}>Title</TableCell>
              <TableCell align="center"sx={{color:'white'}}>Artist</TableCell>
              <TableCell align="center"sx={{color:'white'}}>Lyrics</TableCell>
              <TableCell align="center"sx={{color:'white'}}>Edit</TableCell>
              <TableCell align="center"sx={{color:'white'}}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs_HTMLTABLE}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
    )
}

export default ViewSong
import React, {useState} from 'react';
import './table.css';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';

const AddSong = () => {
    const history = useNavigate();
    const [songInput, setSong] = useState({
        title: "",
        artist: "",
        lyrics: "",
        error_list: [],
    });
    const handleInput = (e) => {
        e.persist();
        setSong({...songInput, [e.target.name]: e.target.value});
    };
    const saveSong = (e) => {
        e.preventDefault();
        const data = {
            title: songInput.title,
            artist: songInput.artist,
            lyrics: songInput.lyrics
        }
        axios.post(`api/addsong`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success!", res.data.message, "Success");
                setSong({
                    title: "",
                    artist: "",
                    lyrics: "",
                    error_list: [],
                });
                history("/songs");
            }
            else if (res.data.status === 422) {
                setSong({...songInput, error_list: res.data.validate_err})
            }
        })
    };

    
    return (
    <div class="container contact">
	    <div class="row mx-3">
		    <div class="col-md-3">
			    <div class="contact-info">
				    <img class="img-fluid" src="../images/song.png" alt="image"/>
				    <h4>Come Sing the Song Lyrics Correctly!</h4>
			    </div>
		    </div>
		    <div class="col-md-9">
                <form class="contact-form" onSubmit={saveSong}>
				    <div class="form-group">
				        <label class="control-label col-12" for="fname">Title</label>
				        <div class="col-sm-12">          
					        <input type="text" class="form-control" id="title" placeholder="Title?" name='title' onChange={handleInput} value={songInput.title}/>
                            <span className='text-danger'>{songInput.error_list.title}</span>   
				        </div>
				    </div>
				    <div class="form-group">
				        <label class="control-label col-12" for="lname">Artist</label>
				        <div class="col-sm-12">          
				        	<input type="text" class="form-control" id="artist" placeholder="Artist?" name='artist' onChange={handleInput} value={songInput.artist}/>
                            <span className='text-danger'>{songInput.error_list.artist}</span>   
				        </div>
				    </div>
				    <div class="form-group">
				        <label class="control-label col-12" for="comment">Lyrics</label>
				        <div class="col-sm-12">
					        <textarea class="form-control" rows="5" id="lyrics" placeholder="Lyrics?" name='lyrics' onChange={handleInput} value={songInput.lyrics}/>
                            <span className='text-danger'>{songInput.error_list.lyrics}</span>   
				        </div>
				    </div>
				    <div class="form-group">        
				        <div class="col-sm-offset-2 col-sm-12 mt-4">
                        <button type='submit' class='btn btn-default' id="add" >Add Song</button>
			    	    </div>
			    	</div>
			    </form>
            </div>
	    </div>
    </div>
    )
}

export default AddSong
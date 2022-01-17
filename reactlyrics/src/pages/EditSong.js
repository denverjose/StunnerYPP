import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditSong = () => {

    const navigate = useNavigate();
    const [songInput, setSong] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorInput, setError] = useState([]);
    const {id} = useParams();
    const handleInput = (e) => {
        return setSong({...songInput, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        const song_id = id;
        axios.get(`api/editsong/${song_id}`).then(res => {
                if(res.data.status === 200){
                    setSong(res.data.song);
                    setLoading(false);
                }
                else if(res.data.status === 404) {
                    swal(`error`, res.data.message);
                    navigate('/songs');
                }
            })
    }, [navigate, id]);

    const updateSong = (e) => {
        e.preventDefault();
        const data = {
            title:songInput.title,
            artist:songInput.artist,
            lyrics:songInput.lyrics
        }
        axios.put(`api/updatesong/${id}`,data).then(
            res => {
                if(res.data.status === 200){
                    swal('Success!', res.data.message);
                    setError([]);
                    navigate('/songs')
                }
                else if(res.data.status === 404) {
                    swal(`error`, res.data.message);
                    navigate('/songs');
                }
                else if(res.data.status === 422) {
                    swal('All fields are mandatory!', '');
                    setError(res.data.validationErrors);
                }
            })
    };

    return (
        <div class="container contact">
	    <div class="row">
		    <div class="col-md-3">
			    <div class="contact-info">
				    <img src="https://cdn-icons-png.flaticon.com/512/2480/2480421.png" class="img-fluid" alt="image"/>
				    <h2>My Song Journal</h2>
				    <h6>Any update?</h6>
			    </div>
		    </div>
		    <div class="col-md-9">
                <form onSubmit={updateSong} class="contact-form">
				    <div class="form-group">
				        <label class="control-label col-sm-2" for="title">Title</label>
				        <div class="col-sm-10">          
					        <input type="text" class="form-control" id="title" placeholder="Title?" name='title' onChange={handleInput} value={songInput.title}/>
                            <span className='text-danger'>{errorInput.title}</span>   
				        </div>
				    </div>
				    <div class="form-group">
				        <label class="control-label col-sm-2" for="lname">Artist</label>
				        <div class="col-sm-10">          
				        	<input type="text" class="form-control" id="artist" placeholder="Artist?" name='artist' onChange={handleInput} value={songInput.artist}/>
                            <span className='text-danger'>{errorInput.artist}</span>   
				        </div>
				    </div>
				    <div class="form-group">
				        <label class="control-label col-sm-2" for="comment">Lyrics:</label>
				        <div class="col-sm-10">
					        <textarea class="form-control" rows="5" id="lyrics" placeholder="Lyrics?" name='lyrics' onChange={handleInput} value={songInput.lyrics}/>
                            <span className='text-danger'>{errorInput.lyrics}</span>   
				        </div>
				    </div>
				    <div class="form-group">        
				        <div class="col-sm-offset-2 col-sm-10 mt-4">
                        <button type='submit' class='btn btn-default' id="add">Update Song</button>
			    	    </div>
			    	</div>
			    </form>
            </div>
	    </div>
    </div>
    )
};

export default EditSong
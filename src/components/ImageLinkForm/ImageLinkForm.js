import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ()=> {
    return (
        <div>
            <p className="f3 b">
                {'This Magic Brain will detect faces in your picture. Give it a try!'}
            </p>
            <div className='center br-pill'>
                <div className='form center pa4 br4 shadow-5'>
                <input className='f4 pa2 w-70 br-pill center' type="text"/>
                <button className='w-30 grow f4 link br-pill ph3 pv2 dib-m white bg-light-purple'>Detect</button>
            </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
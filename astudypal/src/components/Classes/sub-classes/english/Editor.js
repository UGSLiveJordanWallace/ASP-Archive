import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { AiOutlineHome } from 'react-icons/ai';
import SaveAs, { ExportFile } from '../../../service-components/SaveAs';
import SaveClass from '../../class-services/english-server-ping';

export default function Editor() {
    const [currentScreenMode, setCurrentScreenMode] = useState("Full Screen");

    function fullScreenHandling() {
        const elem = document.getElementById("english-class");

        if (document.fullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            } else {
                return;
            }
            setCurrentScreenMode("Full Screen");
        } else {
            if (elem.requestFullscreen) {
              elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
              elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
              elem.msRequestFullscreen();
            } else {
                return;
            }
            setCurrentScreenMode("Close Full Screen");
        }
    }

    async function saveAsHandling(e, saveComponent) {
        e.preventDefault();

        try {
            console.log(await new SaveClass(saveComponent).saveAs());
        } catch(e) {
            console.log('Someting Went Wrong!! ' + e);
        }
    }

    function exportHandling(e) {

    }

    return (
        <div id='english-class' style={{backgroundColor: "white"}}>
            <h1>English Class <Link to="/table-of-contents/"><AiOutlineHome className="list-icon"/></Link></h1>
            <hr/>
            
            <div className="english-editor">
                <div className="editor-bar">
                    <Dropdown>
                        <Dropdown.Toggle variant="danger" id="dropdown-basic">
                            File
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>Save</Dropdown.Item>
                            <SaveAs setSaveAsFunction={saveAsHandling}/>
                            <ExportFile/>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Edit
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Undo</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Redo</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Find and Replace</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                            View
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={fullScreenHandling}>{currentScreenMode}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Tools
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Word Count</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <textarea autoFocus maxLength={350}></textarea>
            </div>
        </div>
    )
}

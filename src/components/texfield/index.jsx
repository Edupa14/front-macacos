
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import '../texfield/index.css';


const TextFieldGeneral = ({ cambiarHTML, mensaje, limpieza}) => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    useEffect(() => {
        if (mensaje !== undefined) {
                const blocksFromHtml = htmlToDraft(mensaje);
                const { contentBlocks, entityMap } = blocksFromHtml;
                const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState)
                cambiarHTML(mensaje)
        }

    }, [mensaje])

    useEffect(()=>{
        setEditorState('')
    }, [limpieza])

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        cambiarHTML(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    };

    return (
        <>
            <div >
                
                    <Editor
                        initialContentState={editorState}
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="editorGenerico-wrapper"
                        editorClassName="editorGenerico-editor"
                        onEditorStateChange={onEditorStateChange}
                    />
                
                
                {/* <textarea style={{ width: "100%" }} disabled value={
                    draftToHtml(convertToRaw(editorState.getCurrentContent()))
                }></textarea> */}

            </div>
        </>
    );
}

export default TextFieldGeneral;
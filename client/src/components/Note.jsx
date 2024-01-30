// sử dụng thư viện để chuyển content người dùng nhập từ front để trở thành html
// rồi gửi lên backend
//npm install --save react-draft-wysiwyg draft-js draftjs-to-html

import { useEffect, useMemo, useState } from "react"
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html';
import { useLoaderData, useLocation, useSubmit} from 'react-router-dom'
import { debounce } from '@mui/material';



// sử dụng kỹ thuật debounce

function Note() {
    const {data} = useLoaderData();
    const note = data.note
    const location = useLocation(); 
    const submit = useSubmit()

    // console.log('««««« note »»»»»', note);
    const [editorState, setEditorState] = useState(() => {
        return EditorState.createEmpty()
    })

    // lấy nội dung được nhập
    const [rawHTML, setRawHTML] = useState(note?.content)

    const handleOnChange = (e) => {
        setEditorState(e);
        setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));

    }
    useEffect(() => {
        setRawHTML(note.content)
    }, [note.content])


    // kỹ thuật debounce
    useEffect(() => {
        debouncedMemorized(rawHTML, note, location.pathname);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [rawHTML, location.pathname]);
    
      const debouncedMemorized = useMemo(() => {
        return debounce((rawHTML, note, pathname) => {
            // console.log('««««« pathname ok»»»»»', pathname);
          if (rawHTML === note.content) return;
    
          submit({...note, content: rawHTML}, {
            method: 'POST',
            action: pathname
          })
        }, 1000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    useEffect(() => {
        const blocksFromHTML = convertFromHTML(note.content);
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(state));
    }, [note.id]);

    return (
        <Editor editorStyle={{paddingLeft: '10px'}} editorState={editorState} onEditorStateChange={handleOnChange} placeholder="Write something"></Editor>
    )
}

export default Note
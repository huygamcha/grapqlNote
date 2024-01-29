import { requestGraphql } from "./request";


// giá trị của notes nhận từ url
// với parmas là tham số nhận từ ui, truyền vào câu query
export const notesList = async ({params}) => {
    try {
        const query = `query Query($folderId: String) {
            folder(folderId: $folderId) {
              id
              name
              notes {
                id
                content
                updatedAt
              }
            }
          }`;
         const data = await requestGraphql({query, variables: params})
          return data;
        
    } catch (error) {
        console.log('««««« error »»»»»', error);
    }
}

export const noteItem =  async ({params}) => {
    try {
        const query = `query Query($noteId: String) {
            note(noteId: $noteId) {
              id
              content
            }
          }
          `;
          const data = await requestGraphql({query, variables: params})
          return data;
        
    } catch (error) {
        console.log('««««« error »»»»»', error);
    }
}

export const deleteNote =  async (params) => {
  console.log('««««« params 1»»»»»', params);
  try {
      const query = `mutation Mutation($id: String!) {
        deleteNote(id: $id) {
          content
          id
          updatedAt
        }
      } `;
        const data = await requestGraphql({query, variables: params})
        return data;
      
  } catch (error) {
      console.log('««««« error »»»»»', error);
  }
}




export const addNewNote = async ({ request}) => {
  // nhận dữ liệu từ useSubmit
  const newNote = await request.formData();
  const formDataObject = {}
  newNote.forEach( (key, value) => formDataObject[value] = key)
  console.log('««««« data »»»»»', formDataObject);

  const query = `mutation Mutation($content: String, $folderId: String!) {
    addNote(content: $content, folderId: $folderId) {
      id
      content
    }
  }`;
  const data = await requestGraphql({query, variables:formDataObject })
  console.log('««««« addNewNote »»»»»', data);

  return data;
}

export const updateNote = async({request}) => {
  const updateNote = await request.formData();
  const formDataObject = {};
  updateNote.forEach((key, value) => formDataObject[value] = key)
  const query = `mutation Mutation($content: String!, $id: String!) {
    updateNote(content: $content, id: $id) {
      id
      content
    }
  }`;
  const data = await requestGraphql({query, variables:formDataObject })
  console.log('««««« addnewNote »»»»»', data);

  return data;

}


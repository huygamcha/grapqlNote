import { requestGraphql } from "./request";

export const folderList =  async () => {
    try {
       const query = `query Folder {
           folders {
             id,
             name,
           }
         }`;
      const data = await requestGraphql({query})
       return data;
       
    } catch (error) {
       console.log('««««« error »»»»»', error);
    }
   }

   // tham số được nhận từ ui 
   export const addNewFolder = async (newFolder) => {
      try {
         const query = `mutation Mutation($name: String!) {
            addFolder(name: $name) {
              name
              author {
                name
              }
            }
          }`
          const data = await requestGraphql({query, variables: {
            name: newFolder.name
          }})
          return data;
      } catch (error) {
         console.log('««««« error »»»»»', error);
      }
   }

   export const deleteFolder =  async (params) => {
      console.log('««««« params »»»»»', params);
      try {
          const query = `mutation Mutation($id: String!) {
            deleteFolder(id: $id) {
              name
              id
            }
          } `;
            const data = await requestGraphql({query, variables: params})
            return data;
          
      } catch (error) {
          console.log('««««« error »»»»»', error);
      }
    }

    export const editFolder =  async (params) => {
      console.log('««««« params »»»»»', params);
      try {
          const query = `mutation Mutation($id: String!, $name: String!) {
            updateFolder(id: $id, name: $name) {
              id
              name
            }
          }`;
            const data = await requestGraphql({query, variables: params})
            return data;
          
      } catch (error) {
          console.log('««««« error »»»»»', error);
      }
    }
    
    
    
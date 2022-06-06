import React, { useEffect, useState } from 'react';
import { uniqueId } from 'loadsh';
import fileSize from 'filesize';
import Upload from './components/Uploads';
import { Container, Content } from './styles';
import GlobalStyle from './styles/main';
import FileList from './components/Filelist';
import { api } from './services/api';

function App() {
  const [files, setFiles] = useState([]);
  const [update, setUpdate] = useState(false);

  async function fetchData() {
    const response = await api.get('/post');
    const responseFiltered = response.data.map((file) => ({
      id: file._id,
      name: file.name,
      readableSize: fileSize(file.size),
      preview: file.url,
      uploaded: true,
      url: file.url,
    }));
    setFiles(responseFiltered);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const updateFile = (id, fileList, data) => {
    const result = fileList.map((file) => {
      if (file.id === id) {
        return { ...file, ...data };
      }

      return file;
    });
    setFiles(result);
  };

  const sendUpload = (fileUploaded, fileList) => {
    const data = new FormData();
    data.append('file', fileUploaded.file, fileUploaded.name);

    api.post('/post', data, {
      onUploadProgress: (e) => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total), 10);

        updateFile(fileUploaded.id, fileList, {
          progress,
        });
      },
    }).then((response) => {
      updateFile(fileUploaded.id, fileList, {
        uploaded: true,
        id: response.data._id,
        url: response.data.url,

      });
    }).catch(() => {
      updateFile(fileUploaded.id, fileList, {
        error: true,

      });
    });
  };

  const handleDelete = async (inputFile) => {
    await api.delete(`/post/${inputFile.id}`);
    setUpdate(!update);
  };

  useEffect(() => {
    fetchData();
  }, [update]);

  const handleUpload = (inputFiles) => {
    const filesUploaded = inputFiles.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: fileSize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,

    }));
    const newArray = files.concat(filesUploaded);

    filesUploaded.forEach((file) => sendUpload(file, newArray));
  };

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUpload} />

        <FileList files={files} handleDelete={handleDelete} />

      </Content>
      <GlobalStyle />
    </Container>
  );
}

export default App;

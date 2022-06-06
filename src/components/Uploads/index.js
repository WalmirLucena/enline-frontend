import React from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import DropContainer from './styles';

function Upload(props) {
  const { onUpload } = props;

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      'image/*': [], 'application/vnd.ms-powerpoint': [], 'application/msword': [], 'application/pdf': [],
    },
    onDropAccepted: onUpload,
  });

  const renderMessage = (isAccept, isReject) => {
    if (!isAccept) {
      return <p>Arraste os seus arquivos aqui, ou clique para selecionar</p>;
    }
    if (isReject) {
      return <p>Arquivo não suportado</p>;
    }

    return <p>Solte os arquivos aqui</p>;
  };
  return (
    <div className="container">
      <DropContainer
        {...getRootProps({ isFocused, isDragAccept, isDragReject })}
      >
        <input data-testid="input-file" {...getInputProps()} />
        {renderMessage(isDragAccept, isDragReject)}
      </DropContainer>

    </div>
  );
}

Upload.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default Upload;

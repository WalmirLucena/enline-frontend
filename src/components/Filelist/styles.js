import styled from 'styled-components';

const Container = styled.ul`
    margin-top: 20px;

    li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #444;
        margin-bottom: 15px;
    }

`;

const FileInfo = styled.div`
    display: flex;
    align-items: center;

    div {
        display: flex;
        flex-flow: column;

        span {
            font-size: 12px;
            color: #999;
            margin-top: 5px;

            button {
                border: 0;
                background: transparent;
                color: #ff1744;
                margin-left: 5px;
            }
        }
    }

`;

const Preview = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 5px;
    background-image: url(${(props) => props.src});
    background-repeat: no-repeat;
    background-position: 50% 50%;
    margin-right: 10px;
`;

export { Container, FileInfo, Preview };

import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    height: 100%;

    form {
        display: flex;
        flex-direction: column;

        fieldset {
            display: flex;
            align-items: flex-start;
            flex-direction: column;

            input {
                margin: 0 0 15px;
            }
        }

        input[type=submit] {
            margin: 15px 0 0;
        }
    }
`;
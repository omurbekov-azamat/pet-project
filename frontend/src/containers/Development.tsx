import React from 'react';

interface Props {
    dashboard: string;
}

const Development: React.FC<Props> = ({dashboard}) => {
    return (
        <>
            {dashboard}
        </>
    );
};

export default Development;
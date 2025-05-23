import { useEffect } from 'react';

function Alert({ name = '', closeAlert = Function.prototype }) {
    useEffect(() => {
        const timer = setTimeout(closeAlert, 3000);
        return () => clearTimeout(timer);
    }, [closeAlert]);

    return (
        <div
        className="alert alert-success position-fixed bottom-0 end-0 m-4 shadow"
        style={{ zIndex: 2000 }}
        >
        {name} добавлен в корзину
        </div>
    );
}

export default Alert;
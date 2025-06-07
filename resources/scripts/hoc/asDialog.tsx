import { useState } from 'react';

import { Dialog, DialogProps, DialogWrapperContext, WrapperProps } from '@/components/elements/dialog';

function asDialog(
    initialProps?: WrapperProps,
): <P extends object>(C: React.ComponentType<P>) => React.FunctionComponent<P & DialogProps> {
    return function (Component) {
        return function ({ open, onClose, ...rest }) {
            const [props, setProps] = useState<WrapperProps>(initialProps || {});

            return (
                <DialogWrapperContext.Provider value={{ props, setProps, close: onClose }}>
                    <Dialog {...props} open={open} onClose={onClose}>
                        <Component {...(rest as unknown as React.ComponentProps<typeof Component>)} />
                    </Dialog>
                </DialogWrapperContext.Provider>
            );
        };
    };
}

export default asDialog;

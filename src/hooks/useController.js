import { useState, useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';


const useController = (props) => {
    const [action, setAction] = useState(true);

    const handleKeyDown = (key) => {
        console.log("Action:",key);
        if (props.actions) props.actions(key);
        setAction(!action);
    }

    const keyPress = useCallback(
        (e) => {
            handleKeyDown(e.key);
        },
        [action]
    );

    useEffect(() => {
        window.addEventListener('keydown', keyPress);
        return () => {
            window.removeEventListener('keydown', keyPress);
        }
    }
        , [action]);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleKeyDown("ArrowLeft"),
        onSwipedUp: () => handleKeyDown("ArrowUp"),
        onSwipedRight: () => handleKeyDown("ArrowRight"),
        onSwipedDown: () => handleKeyDown("ArrowDown"),
    });

    return [swipeHandlers];
}

export default useController;
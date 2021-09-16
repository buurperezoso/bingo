import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import winAnimation from '../../assets/lotties/74668-win-animation.json';
import { WinModalProps } from '../../interfaces/WinModal';
import styles from './winModal.module.css';

const WinModal = ({ show, onRestart }: WinModalProps) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: winAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        setIsShowing(show);
    }, [show])

    return (
        <>
            {
                isShowing && (
                    <div className={styles.container}>
                        <div className={styles.subContainer}>
                            <Lottie
                                options={defaultOptions}
                                height={800}
                                width={800}
                                isClickToPauseDisabled={true}
                            />
                            <div className={styles.textAndButton}>
                                <span className={styles.text}>YOU WON!</span>
                                <button type="button" className='btn btn-warning' onClick={onRestart}>Restart</button>
                            </div>
                        </div>
                    </div >
                )
            }
        </>
    )
};

export default WinModal;
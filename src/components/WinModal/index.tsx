import { useEffect, useState } from 'react';
import { WinModalProps } from '../../interfaces/WinModal';
import styles from './winModal.module.css';
import Confetti from 'react-confetti';
import useScreenSize from '../../hooks/useScreenSize';

const WinModal = ({ show, onRestart, showModal }: WinModalProps) => {
    const windowSize = useScreenSize();
    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        setIsShowing(show);
    }, [show]);

    return (
        <>
            {
                isShowing && (
                    <div className={styles.container}>
                        <div className={styles.subContainer}>
                            <Confetti
                                width={windowSize?.width}
                                height={windowSize?.height}
                            />
                            <div className={styles.textAndButton}>
                                <span className={styles.text}>YOU WON!</span>
                                <div>
                                    <button type="button" className='btn btn-warning' onClick={onRestart}>Restart</button>
                                    <button type="button" className='btn btn-primary' style={{ marginLeft: '1rem' }} onClick={() => showModal(false)}>Continue</button>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            }
        </>
    )
};

export default WinModal;
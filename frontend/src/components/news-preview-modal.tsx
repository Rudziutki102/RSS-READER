import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ImageComponent from './image-component';
import { FeedItem } from '../types/feeds-types';

const modalRoot = document.getElementById('modal-root');
type NewsPreviewModalProps = {
    feed: FeedItem | null;
    onClose: () => void;
}

export default function NewsPreviewModal({ feed, onClose }: NewsPreviewModalProps) {
    if (!feed) return null;
    return modalRoot ? createPortal(
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-white dark:bg-gray-800 dark:border-gray-700 p-6 rounded-xl max-w-lg w-full shadow-lg relative"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <button onClick={onClose} className="absolute top-2 right-3 text-white text-xl">&times;</button>
                    <p className="dark:text-white text-sm mb-2">{new Date(feed.isoDate).toLocaleDateString()}</p>
                    <h1 className="dark:text-white font-bold text-2xl">{feed.title}</h1>
                    {feed.enclosure?.url && feed.enclosure.type == "image/jpeg" ? (
                        <div className='aspect-video w-full mb-4'>
                            <ImageComponent src={feed.enclosure.url} alt={feed.title} />
                        </div>
                    ) : null}
                    <p className="dark:text-white">{feed.content || feed.description}</p>
                    <a href={feed.link} className='dark:text-white underline'>Go to website</a>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        modalRoot
    ) : null
}
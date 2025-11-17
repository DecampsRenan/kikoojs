import { AnimatePresence, motion } from "motion/react";

export const DancingDuck = ({ show = false }: { show: boolean }) => {
	return (
		<AnimatePresence>
			{show && (
				<motion.img
					transition={{ ease: "easeOut", duration: 0.1 }}
					initial={{ scale: 1.1, filter: "blur(5px)" }}
					exit={{ scale: 0.9, filter: "blur(5px)" }}
					animate={{ scale: 1, filter: "blur(0px)" }}
					className="will-change-[filter,scale] origin-center fixed z-50 top-1/2 left-1/2 -translate-1/2 my-auto ease-out"
					src="/img/dancing-duck.gif"
					alt="A dancing duck"
				/>
			)}
		</AnimatePresence>
	);
};

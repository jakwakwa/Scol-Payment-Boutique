import type React from "react";
import { cn } from "@/lib/utils";

interface FieldGroupProps {
	children: React.ReactNode;
	label?: string;
	className?: string;
}

/**
 * Wrapper that applies the `.field-group` CSS class for the
 * focus-within spotlight effect. Also adds staggered entrance
 * via the `.field-enter` class.
 */
const FieldGroup = ({ children, label, className }: FieldGroupProps) => {
	return (
		<fieldset
			className={cn("field-group field-enter border-none p-0 m-0", className)}
			aria-label={label}
		>
			{children}
		</fieldset>
	);
};

export default FieldGroup;

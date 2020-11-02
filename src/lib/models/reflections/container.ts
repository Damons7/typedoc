import {
    Reflection,
    ReflectionKind,
    TraverseCallback,
    TraverseProperty,
} from "./abstract";
import { ReflectionCategory } from "../ReflectionCategory";
import { ReflectionGroup } from "../ReflectionGroup";
import { DeclarationReflection } from "./declaration";
import { toArray } from "lodash";

export class ContainerReflection extends Reflection {
    /**
     * The children of this reflection.
     */
    children?: DeclarationReflection[];

    /**
     * All children grouped by their kind.
     */
    groups?: ReflectionGroup[];

    /**
     * All children grouped by their category.
     */
    categories?: ReflectionCategory[];

    /**
     * Return a list of all children of a certain kind.
     *
     * @param kind  The desired kind of children.
     * @returns     An array containing all children with the desired kind.
     */
    getChildrenByKind(kind: ReflectionKind): DeclarationReflection[] {
        return (this.children || []).filter((child) => child.kindOf(kind));
    }

    /**
     * Traverse all potential child reflections of this reflection.
     *
     * The given callback will be invoked for all children, signatures and type parameters
     * attached to this reflection.
     *
     * @param callback  The callback function that should be applied for each child reflection.
     */
    traverse(callback: TraverseCallback) {
        for (const child of toArray(this.children)) {
            if (callback(child, TraverseProperty.Children) === false) {
                return;
            }
        }
    }
}

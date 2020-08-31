class Nil {
    constructor() {
        this.data = 'nil'
        this.isRed = false
    }
}
class Node {
    constructor(data) {
        this.data = data
        this.isRed = true
        this.left = new Nil()
        this.right = new Nil()
    }
}
class RedBlackTree {
    constructor() {
        this.root = null
    }
    // 定义变色
    changeColor(node) {
        node.isRed = !node.isRed
    }
    // 左旋转
    rotateLeft(node, parent, isLeft) {
        // 如果不是根节点
        if (parent) {
            // 如果没有右子节点
            if (node.right.data == 'nil') {
                return
            } else {
                // 如果node是父元素的左孩子         parent
                //                               /   \
                //                             node
                //                             /  \
                //                             l   r
                //                                 / \
                //                                l   r
                if (isLeft) {
                    parent.left = node.right
                    node.right = node.right.left
                    parent.left.left = node
                } else { // 如果node是父元素的右孩子
                    parent.right = node.right
                    node.right = node.right.left
                    parent.right.left = node
                }

            }
        } else {
            // 如果是根节点
            if (node.right.data == 'nil') {
                return
            } else {
                //                             node(root)
                //                             /  \
                //                             l   r
                //                                 / \
                //                                l   r
                    this.root = node.right
                    node.right = node.right.left
                    this.root.left = node
            }
        }
    }
    // 右旋转
    rotateRight(node, parent, isLeft) {
        // 如果不是根节点
        if (parent) {
            // 如果没有左子节点
            if (node.left.data == 'nil') {
                return
            } else {
                // 如果node是父元素的左孩子         parent
                //                               /   \
                //                             node
                //                             /  \
                //                             l   r
                //                            / \
                //                           l   r
                if (isLeft) {
                    parent.left = node.left
                    node.left = node.left.right
                    parent.left.right = node
                } else { // 如果node是父元素的右孩子
                    parent.right = node.left
                    node.left = node.left.right
                    parent.right.right = node
                }

            }
        } else {
            // 如果是根节点
            if (node.left.data == 'nil') {
                return
            } else {
                //                               
                //                             node（root）
                //                             /  \
                //                             l   r
                //                            / \
                //                           l   r
                    this.root = node.left
                    node.left = node.left.right
                    this.root.right = node

            }
        }

    }
    // 定义内部的add节点方法
    _add(node,parent,grandPa){
        if(parent.data!='nil'){
            if(node.data<parent.data){
                this._add(node,parent.left,parent)
            }else if(node.data>parent.data){
                this._add(node,parent.right,parent)
            }
        }
        
    }
    // 插入节点方法
    insert(data) {
        const newNode = new Node(data)
        // 如果是根节点
        if (this.root == null) {
            this.root = newNode
            this.changeColor(this.root)
            return
        }
        // 如果只有插入的是根节点的子节点
        if (newNode.data > this.root.data && this.root.right.data == 'nil') {
            this.root.right = newNode
            return
        } else if (newNode.data < this.root.data && this.root.left.data == 'nil') {
            this.root.left = newNode
            return
        }
        // 如果不是 开始查找插入位置
        let grandPa = null
        let parent = null
        let uncle = null
        let parentIsLeft = true
        let isLeft = true
        let current = this.root
        while (current.data != 'nil') {
            if (newNode.data < current.data) {
                grandPa = parent
                parentIsLeft = isLeft
                if (parentIsLeft && grandPa) {
                    uncle = grandPa.right
                }
                parent = current
                isLeft = true
                current = current.left
            } else if (newNode.data > current.data) {
                grandPa = parent
                parentIsLeft = isLeft
                if (!parentIsLeft && grandPa) {
                    uncle = grandPa.left
                }
                parent = current
                isLeft = false
                current = current.right
            } else {
                return
            }
        }
        // 如果parent和uncle都是红色
        if (parent && uncle && parent.isRed && uncle.isRed) {
            if (isLeft) {
                parent.left = newNode
                this.changeColor(newNode)
                return
            } else {
                parent.right = newNode
                this.changeColor(newNode)
                return
            }
        }
    }
}

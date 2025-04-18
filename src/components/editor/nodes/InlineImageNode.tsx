import {
    DecoratorNode,
    EditorConfig,
    LexicalEditor,
    NodeKey,
    SerializedLexicalNode,
    Spread,
  } from "lexical";
  import * as React from "react";
  
  // 👇 Interface để serialized node khi lưu JSON
  export type SerializedInlineImageNode = Spread<
    {
      url: string;
      altText: string;
      width: number;
      height: number;
      position: "left" | "right" | "full";
      type: "inline-image";
      version: 1;
    },
    SerializedLexicalNode
  >;
  
  export class InlineImageNode extends DecoratorNode<React.JSX.Element> {
    __url: string;
    __altText: string;
    __width: number;
    __height: number;
    __position: "left" | "right" | "full";
  
    static getType(): string {
      return "inline-image";
    }
  
    static clone(node: InlineImageNode): InlineImageNode {
      return new InlineImageNode(
        node.__url,
        node.__altText,
        node.__width,
        node.__height,
        node.__position,
        node.__key
      );
    }
  
    constructor(
      url: string,
      altText: string,
      width: number,
      height: number,
      position: "left" | "right" | "full" = "full",
      key?: NodeKey
    ) {
      super(key);
      this.__url = url;
      this.__altText = altText;
      this.__width = width;
      this.__height = height;
      this.__position = position;
    }
  
    createDOM(): HTMLElement {
      const span = document.createElement("span");
      return span;
    }
  
    updateDOM(): false {
      return false;
    }
  
    static importJSON(
      serializedNode: SerializedInlineImageNode
    ): InlineImageNode {
      const { url, altText, width, height, position } = serializedNode;
      return new InlineImageNode(url, altText, width, height, position);
    }
  
    exportJSON(): SerializedInlineImageNode {
      return {
        type: "inline-image",
        version: 1,
        url: this.__url,
        altText: this.__altText,
        width: this.__width,
        height: this.__height,
        position: this.__position,
      };
    }
  
    decorate(_editor: LexicalEditor, _config: EditorConfig): React.JSX.Element {
      const styleMap: Record<string, string> = {
        left: "float-left mr-4",
        right: "float-right ml-4",
        full: "block mx-auto",
      };
  
      return (
        // <img
        //   src={this.__url}
        //   alt={this.__altText}
        //   style={{
        //     width: `${this.__width}px`,
        //     height: `${this.__height}px`,
        //   }}
        //   className={`my-2 rounded-md ${styleMap[this.__position]}`}
        //   draggable={false}
        // />
        <img
        src={this.__url}
        alt={this.__altText}
        className={`w-full h-auto my-4 rounded-md object-contain ${styleMap[this.__position]}`}
        draggable={false}
      />
      );
    }
  
    isInline(): boolean {
      return true;
    }
  }
  
  // 👇 Helper functions
  export function $createInlineImageNode(
    url: string,
    altText: string,
    width: number,
    height: number,
    position: "left" | "right" | "full" = "full"
  ): InlineImageNode {
    return new InlineImageNode(url, altText, width, height, position);
  }
  
  export function $isInlineImageNode(
    node: unknown
  ): node is InlineImageNode {
    return node instanceof InlineImageNode;
  }
"use client";

import {
  LexicalComposer,
  InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { CodeNode, CodeHighlightNode } from "@lexical/code";

import { InlineImageNode } from "@/components/editor/nodes/InlineImageNode";

interface LexicalViewerProps {
  jsonContent: string;
}

export default function LexicalViewer({ jsonContent }: LexicalViewerProps) {
  const initialConfig: InitialConfigType = {
    namespace: "viewer",
    editable: false, // ✅ readonly
    onError: (error) => {
      console.error("Lexical error:", error);
    },
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      CodeNode,
      CodeHighlightNode,
    
      InlineImageNode,
    ],
    theme: {
        text: {
            underline: "underline",
          },
          heading: {
            h1: "text-3xl font-bold",
            h2: "text-2xl font-semibold",
            h3: "text-xl font-semibold",
            h4: "text-lg font-medium",
            h5: "text-base font-medium",
            h6: "text-sm font-medium",
          },
          paragraph: "text-base", // optional
          quote: "pl-4 border-l-4 border-gray-300 italic text-gray-600", // optional
          list: {
            ul: "list-disc pl-5",
            ol: "list-decimal pl-5",
            listitem: "mb-1",
          },
          link: "text-blue-600 underline cursor-pointer",
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig} >
      <ContentLoader jsonContent={jsonContent} />
    </LexicalComposer>
  );
}

function ContentLoader({ jsonContent }: { jsonContent: string }) {
  const [editor] = useLexicalComposerContext();
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current && jsonContent) {
      try {
        const parsed = JSON.parse(jsonContent);
        const newEditorState = editor.parseEditorState(parsed);

        editor.update(() => {
            editor.setEditorState(newEditorState);
            loaded.current = true;
          });
  
    
      } catch (err) {
        console.error("Failed to parse editor content", err);
      }
    }
  }, [jsonContent, editor]);

  return (
    <RichTextPlugin
      contentEditable={
        <ContentEditable className="prose dark:prose-invert max-w-none outline-none" />
      }
      placeholder={null}
      ErrorBoundary={LexicalErrorBoundary}
    />
  );
}
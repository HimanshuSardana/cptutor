import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "./styles.css";
import 'prismjs/components/prism-go';

// Need to import both c and cpp for C++ code to work
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';

export default function Code({ code, language }) {
        useEffect(() => {
                Prism.highlightAll();
        }, []);
        return (
                <div className="Code rounded-md">
                        <pre>
                                <code className={`rounded-sm rounded-sm language-${language}`}>{code}</code>
                        </pre>
                </div>
        );
}

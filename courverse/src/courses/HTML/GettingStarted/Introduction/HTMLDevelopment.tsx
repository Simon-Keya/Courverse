import React from 'react';
import './styles/development.css';

const Development: React.FC = () => {
  return (
    <div className="development-content">
      <h1>Development of HTML</h1>
      <p>
        HTML was originally developed by Tim Berners-Lee in 1990, who is also known as the father of the web. In 1996, the World Wide Web Consortium (W3C) became the authority responsible for maintaining HTML specifications.
      </p>
      <p>
        In 2000, HTML also became an international standard (ISO).
      </p>
      <p>
        HTML5 is the latest version of HTML. It offers a faster and more robust approach to web development with new elements like <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, and <code>&lt;nav&gt;</code>.
      </p>
      <ul>
        <li>HTML5 supports multimedia elements such as <code>&lt;audio&gt;</code> and <code>&lt;video&gt;</code>.</li>
        <li>It provides better semantics and accessibility with tags like <code>&lt;figure&gt;</code> and <code>&lt;figcaption&gt;</code>.</li>
      </ul>
    </div>
  );
};

export default Development;

import React from 'react';
import './styles/WhatIsHTML.css';

const WhatIsHTML: React.FC = () => {
  return (
    <div className="lesson-content">
      <h1>What is HTML?</h1>
      <p>
        HTML stands for Hypertext Markup Language, and it is the most widely used language for the development of web pages.
      </p>
      <p>
        As its name suggests, HTML is a Markup Language which means you use HTML to simply "mark up" a text document with tags that tell a web browser how to structure it to display.
      </p>
      <p>
        Markup languages use sets of markup tags to characterize text elements within a document, which gives instructions to web browsers on how the document should appear.
      </p>
      <h2>Origin of HTML</h2>
      <p>
        HTML was created by Tim Berners-Lee in late 1991 but "HTML 2.0" was the first standard HTML specification that was published in 1995.
      </p>
      <p>
        Tim Berners-Lee is a physicist and computer scientist who is best known as the inventor of the World Wide Web. He developed HTML as a way to create and share documents on the internet.
      </p>
      <h2>Evolution of HTML</h2>
      <p>
        Since its inception, HTML has undergone several revisions. Here are some key versions:
      </p>
      <ul>
        <li>
          <strong>HTML 1.0:</strong> The first version of HTML, introduced in 1993, was a very basic and simple version that allowed for basic text formatting and linking.
        </li>
        <li>
          <strong>HTML 2.0:</strong> Released in 1995, this was the first official specification of HTML.
        </li>
        <li>
          <strong>HTML 3.2:</strong> Released in 1997, it added support for more advanced features like tables, applets, and text flow around images.
        </li>
        <li>
          <strong>HTML 4.0:</strong> Released in 1997, it introduced stylesheets (CSS) to separate content from presentation and added support for more complex forms.
        </li>
        <li>
          <strong>HTML 4.01:</strong> A revision of HTML 4.0, released in 1999, which included minor corrections and improvements.
        </li>
        <li>
          <strong>HTML5:</strong> Released in 2014, this version introduced many new features such as semantic elements, multimedia elements (audio, video), and APIs for offline web applications.
        </li>
      </ul>
      <h2>Importance of HTML</h2>
      <p>
        HTML is essential for web development as it forms the structure of web pages. It allows developers to create a variety of content, such as text, images, videos, and links, and arrange them in a structured way.
      </p>
      <p>
        Without HTML, the web as we know it today would not exist. It is the foundation upon which all websites are built.
      </p>
    </div>
  );
};

export default WhatIsHTML;

# HTML notes
## HTML structure elements
ex:

 "<body>
  <p>Body</p>
  <header>
    <p>Header - <span>Span</span></p>
    <nav>
      Navigation
      <div>Div</div>
      <div>Div</div>
    </nav>
  </header>

  <main>
    <section>
      <p>Section</p>
      <ul>
        <li>List</li>
        <li>List</li>
        <li>List</li>
      </ul>
    </section>
    <section>
      <p>Section</p>
      <table>
        <tr>
          <th>Table</th>
          <th>Table</th>
          <th>Table</th>
        </tr>
        <tr>
          <td>table</td>
          <td>table</td>
          <td>table</td>
        </tr>
      </table>
    </section>
    <aside>
      <p>Aside</p>
    </aside>
  </main>

  <footer>
    <div>Footer - <span>Span</span></div>
  </footer>
</body>"


-tips:
You add / in <smth></smth> for example, to end the function/command there

2) <h1> </h1> to make text in a bolder font and larger

3) Hyperlinks are created using the <a> tag in HTML. For example:

<a href="https://www.byu.edu">BYU</a>
<a href="https://www.familysearch.org">FamilySearch</a>

4) Include the src attribute with the image URL and the width attribute to set img size. For example:

<aside>
  <p>Aside</p>
  <img src="https://example.com/image.jpg" width="200">
</aside>

## HTML media

* To insert an image: <img alt="mountain landscape" src="https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg" />
* To insert an audio: <audio controls src="testAudio.mp3"></audio>
* To insert a video: <video controls width="300" crossorigin="anonymous">
  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
</video>

* **If youtube video -- use inframe/embded url**

* For HTML input: always include labels, id and name (make sure to end field or in at the end)
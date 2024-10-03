import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1' />
          {/* category */}
          <Select>
            <option value='uncategorized'>Select a category</option>
            <option value='technology'>Technology</option>
            <option value='lifestyle'>Lifestyle</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="frontend">Frontend Development</option>
            <option value="backend">Backend Development</option>
            <option value="fullstack">Fullstack Development</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
            <option value="csharp">C#</option>
            <option value="golang">Go</option>
            <option value="devops">DevOps</option>
            <option value="cloud">Cloud Computing</option>
            <option value="agile">Agile</option>
            <option value="testing">Testing</option>
            <option value="security">Security</option>
            <option value="database">Database</option>
            <option value="mobile">Mobile Development</option>
            <option value="iot">IoT</option>
            <option value="ai">Artificial Intelligence</option>
            <option value="blockchain">Blockchain</option>
            <option value="career">Career</option>
            <option value="product">Product Management</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="content">Content</option>
            <option value="finance">Finance</option>
            <option value="management">Management</option>
            <option value="leadership">Leadership</option>
            <option value="frameword">Framework</option>
            <option value="library">Library</option>
            <option value="tool">Tool</option>
            <option value="template">Template</option>
            <option value="plugin">Plugin</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-gray-400 border-dotted p-3 '>
          <FileInput type='file'  accept='image/*' />
          <Button color='gray' size='sm' outline>Upload Image</Button>
        </div>
        <ReactQuill 
          theme='snow' 
          placeholder="Write something..." 
          className='h-72 mb-12'
          required
        />
        <Button 
          type='submit'
          color='gray' 
          outline  
          className='font-semibold'
        >
          Publish
        </Button>
      </form>
    </div>
  )
}

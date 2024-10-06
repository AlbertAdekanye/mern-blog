import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput 
            type='text' 
            placeholder='Title' 
            required id='title' 
            className='flex-1' 
            onChange={(e) => 
              setFormData({...formData, title: e.target.value })
            }
          />
          {/* category */}
          <Select
            onChange={(e) => 
              setFormData({...formData, title: e.target.value })
            }
          >
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
          <FileInput 
            type='file'  
            accept='image/*' 
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button 
            color='gray' 
            size='sm' 
            outline
            onClick={handleUpdloadImage}
            disable={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
        <ReactQuill 
          theme='snow' 
          placeholder="Write something..." 
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button 
          type='submit'
          color='gray' 
          outline  
          className='font-semibold'
        >
          Publish
        </Button>
         {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  )
}

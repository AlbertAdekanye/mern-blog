/* eslint-disable no-unused-vars */
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
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

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
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
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
      <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
            <option value='nodejs'>Node.js</option>
            <option value='expressjs'>Express.js</option>
            <option value='mongodb'>MongoDB</option>
            <option value='firebase'>Firebase</option>
            <option value='python'>Python</option>
            <option value='django'>Django</option>
            <option value='flask'>Flask</option>
            <option value='java'>Java</option>
            <option value='springboot'>Spring Boot</option>
            <option value='csharp'>C#</option>
            <option value='dotnet'>.NET</option>
            <option value='golang'>Go</option>
            <option value='rust'>Rust</option>
            <option value='php'>PHP</option>
            <option value='laravel'>Laravel</option>
            <option value='ruby'>Ruby</option>
            <option value='rails'>Rails</option>
            <option value='swift'>Swift</option>
            <option value='kotlin'>Kotlin</option>
            <option value='android'>Android</option>
            <option value='ios'>iOS</option>
            <option value='flutter'>Flutter</option>
            <option value='flow-bite-react'>Flowbite React</option>
            <option value='tailwindui'>Tailwind UI</option>
            <option value='sql'>SQL</option>
            <option value='graphql'>GraphQL</option>
            <option value='typescript'>TypeScript</option>
            <option value='html'>HTML</option>
            <option value='css'>CSS</option>
            <option value='sass'>Sass</option>
            <option value='tailwindcss'>Tailwind CSS</option>
            <option value='bootstrap'>Bootstrap</option>
            <option value='materialui'>Material UI</option>
            <option value='chakraui'>Chakra UI</option>
            <option value='framer-motion'>Framer Motion</option>
            <option value='redux'>Redux</option>
            <option value='contextapi'>Context API</option>
            <option value='webdev'>Web Development</option>
            <option value='webdesign'>Web Design</option>
            <option value='webdevtips'>Web Dev Tips</option>
            <option value='webdevtools'>Web Dev Tools</option>
            <option value='webdevresources'>Web Dev Resources</option>
            <option value='webdevnews'>Web Dev News</option>
            <option value='webdevtrends'>Web Dev Trends</option>
            <option value='webdevshowcase'>Web Dev Showcase</option>
            <option value='webdevprojects'>Web Dev Projects</option>
            <option value='webdevcareer'>Web Dev Career</option>
            <option value='frontenddevelopment'>Frontend Development</option>
            <option value='backenddevelopment'>Backend Development</option>
            <option value='fullstackdevelopment'>Fullstack Development</option>
            <option value='webdevelopment'>Web Development</option>
            <option value='programming'>Programming</option>
            <option value='coding'>Coding</option>
            <option value='softwareengineering'>Software Engineering</option>
            <option value='tech'>Tech</option>
            <option value='technology'>Technology</option>
            <option value='career'>Career</option>
            <option value='productivity'>Productivity</option>
            <option value='cybersecurity'>CyberSecurity</option>
            <option value='cloudcomputing'>Cloud Computing</option>
            <option value='machinelearning'>Machine Learning</option>
            <option value='datascience'>Data Science</option>
            <option value='artificialintelligence'>Artificial Intelligence</option>
            <option value='blockchain'>Blockchain</option>
            <option value='digitalmarketing'>Digital Marketing</option>
            <option value='seo'>SEO</option>
            <option value='socialmedia'>Social Media</option>
            <option value='contentmarketing'>Content Marketing</option>
            <option value='emailmarketing'>Email Marketing</option>
            <option value='growthhacking'>Growth Hacking</option>
            <option value='ecommerce'>E-Commerce</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-gray-500 border-inherit p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            color='gray'
            size='sm'
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
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
          value={formData.content}
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type='submit' color='gray'>
          Update post
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
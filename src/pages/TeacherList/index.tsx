import React, { useState, FormEvent } from 'react';

import './styles.css'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

function TeacherList() {

  const [teachers,setTeachers] = useState([]);

  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  async function searchTeachers(e: FormEvent) {
    e.preventDefault()

    const response = await api.get('/classes',{
      params:{
          subject,
          week_day,
          time
      }
    })

    setTeachers(response.data)
    
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis." >
        <form id="search-teachers" onSubmit={searchTeachers}>

          <Select name="subject" value={subject} label="Matéria"
            onChange={e => setSubject(e.target.value)} options={[
            { value: 'Artes', label: 'Artes' },
            { value: 'Matemática', label: 'Matemática' },
            { value: 'Geografia', label: 'Geografia' },
            { value: 'Português', label: 'Português' },
            { value: 'Educação Física', label: 'Educação Física' },
            { value: 'Física', label: 'Física' },
            { value: 'Química', label: 'Química' },
            { value: 'Filosofia', label: 'Filosofia' },
            { value: 'Biologia', label: 'Biologia' },
            { value: 'Sociologia', label: 'Sociologia' },
          ]} />

          <Select name="week_day" value={week_day} label="Dia da semana"
            onChange={e => setWeekDay(e.target.value)} options={[
            { value: '0', label: 'Domingo' },
            { value: '1', label: 'Segunda-feira' },
            { value: '2', label: 'Terça-feira' },
            { value: '3', label: 'Quarta-feira' },
            { value: '4', label: 'Quinta-feira' },
            { value: '5', label: 'Sexta-feira' },
            { value: '6', label: 'Sábado' },
          ]} />

          <Input type="time" value={time} name="time" label="Hora" onChange={e => setTime(e.target.value)}/>

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher : Teacher) => {
          return <TeacherItem key={teacher.id}  teacher={teacher}/>
        })}
      </main>
    </div>
  );
}

export default TeacherList;
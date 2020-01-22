import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NoteListNav from './NoteListNav'

describe(`NoteListNav component`, () => {
    const context = {
    notes: [
      {
        "id": "1",
        "name": "Dogs",
        "modified": "2019-01-03T00:00:00.000Z",
        "folder_id": "1",
        "content": "Corporis accusamus placeat.\n \rUnde."
      },
      {
        "id": "2",
        "name": "Cats",
        "modified": "2018-08-15T23:00:00.000Z",
        "folder_id": "2",
        "content": "Eos\n \rlaudantium."
      },
      {
        "id": "3",
        "name": "Pigs",
        "modified": "2018-03-01T00:00:00.000Z",
        "folder_id": "3",
        "content": "Occaecati dignissimos\nvoluptatum nihil."
      },
      {
        "id": "4",
        "name": "Birds",
        "modified": "2019-01-04T00:00:00.000Z",
        "folder_id": "1",
        "content": "Eum culpa odit."
      },
    ],
    folders: [
      {
        id: "1",
        name: "Important"
      },
      {
        id: "2",
        name: "Super"
      },
      {
        id: "3",
        name: "Spangley"
      }
    ]

  }

  it('renders a NoteListNav by default', () => {
    const wrapper = shallow(<NoteListNav />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders a link in ul for each folder in array', () => {
    const ul = shallow(<NoteListNav />, { context })
      .find('ul')
    expect(toJson(ul)).toMatchSnapshot()
  })
})

import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NoteListMain from './NoteListMain'

describe(`NoteListMain component`, () => {
  const props = {
    notes: [      {
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
  ]
  }

  it('renders a .NoteListMain by default', () => {
    const wrapper = shallow(<NoteListMain />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders a Note in ul for each notes in array', () => {
    const ul = shallow(<NoteListMain {...props} />)
      .find('ul')
    expect(toJson(ul)).toMatchSnapshot()
  })
})

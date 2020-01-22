import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NotePageMain from './NotePageMain'

describe(`NotePageMain component`, () => {
  const props = {
    note: {
      id: 1,
      name: "Dogs",
      modified: "2019-01-03T00:00:00.000Z",
      folder_id: 1,
      content: "Corporis accusamus placeat.\n \rUnde."
    },
    
    }
  
  it('renders a .NotePageMain by default', () => {
    const wrapper = shallow(<NotePageMain/>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders a Note with note prop', () => {
    const note = shallow(<NotePageMain {...props} />)
      .find('Note')
    expect(toJson(note)).toMatchSnapshot()
  })

  it(`splits the content by \\n or \\n\\r, with a p foreach`, () => {
    [{
      note: { "content": "Content with n r.\n \rafter n r." }
    }, {
      note: { "content": "Content with n.\nafter." }
    }].forEach(props => {
      const content = shallow(<NotePageMain {...props} />)
        .find('NotePageMain__content')
      expect(toJson(content)).toMatchSnapshot()
    })
  })
})

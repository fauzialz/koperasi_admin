import ReactDom from 'react-dom'

const TestTemplate = (child) => {
    it('render without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(child, div);
        ReactDom.unmountComponentAtNode(div)
    })
}

export default TestTemplate

import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.setDigit = this.setDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setDigit(digit) {
        if (digit === '.' && this.state.displayValue.includes('.')) {
            return
        }
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + digit
        this.setState({ displayValue, clearDisplay: false })

        if (digit !== '.') {
            const index = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[index] = newValue
            this.setState({ values })
        }
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true})
        } else {
            const isEquals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]

            switch (currentOperation) {
                case '/':
                    values[0] = values[0] / values[1]
                    break
                case '*':
                        values[0] = values[0] * values[1]
                        break
                case '-':
                    values[0] = values[0] - values[1]
                    break
                case '+':
                    values[0] = values[0] + values[1]
                    break
                default:
                    values[0] = this.state.values[0]
                    break
            }
            
            values[1] = 0
            this.setState({displayValue: values[0], operation: isEquals ? null : operation, current: isEquals ? 0 : 1, clearDisplay: !isEquals, values})
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.setDigit} />
                <Button label="8" click={this.setDigit} />
                <Button label="9" click={this.setDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.setDigit} />
                <Button label="5" click={this.setDigit} />
                <Button label="6" click={this.setDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.setDigit} />
                <Button label="2" click={this.setDigit} />
                <Button label="3" click={this.setDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.setDigit} double />
                <Button label="." click={this.setDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}
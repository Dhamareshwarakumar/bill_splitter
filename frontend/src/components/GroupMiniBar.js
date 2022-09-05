import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const GroupMiniBar = ({ setCurrentSection }) => {
    const handleSectionChange = name => {
        setCurrentSection(name);
    }
    return (
        <ButtonGroup size="lg" className="mb-2">
            <Button
                style={{ borderRight: "1px solid white" }}
                onClick={() => handleSectionChange('expenses')}
            >
                Expenses
            </Button>

            <Button
                style={{ borderLeft: "1px solid white", borderRight: "1px solid white" }}
                onClick={() => handleSectionChange('members')}
            >
                Members
            </Button>

            <Button
                style={{ borderLeft: "1px solid white", borderRight: "1px solid white" }}
                onClick={() => handleSectionChange('transactions')}
            >
                Transactions
            </Button>

            <Button
                style={{ borderLeft: "1px solid white" }}
                onClick={() => handleSectionChange('payments')}
            >
                Payments
            </Button>
        </ButtonGroup>
    )
}

export default GroupMiniBar
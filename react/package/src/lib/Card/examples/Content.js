import React from 'react';
import { Avatar, Button, Card, CardSection, Link } from '@momentum-ui/react';
export default function CardContent() {
	return (
		<Card className="small-3 columns">
			<CardSection style={{display: 'flex', justifyContent: 'space-between'}}>
				<Avatar src="http://react.collab-ui.com/barbara.png" style={{display: 'flex'}} />
				<div style={{paddingLeft: '16px'}}>
					<h4>Content</h4>
					<h6>Subtitle</h6>
				</div>
			</CardSection>
			<CardSection full>
				<img alt="placeholder" src="https://place-hold.it/400x400" />
			</CardSection>
			<CardSection>
				Et netus et malesuada fames ac turpis egestas macecenas. Adipisccing at in tellus integer.
			</CardSection>
			<CardSection style={{width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "baseline"}}>
				<Link href="" style={{marginRight: '16px',}}> Link Text </Link>
				<Button 
					children="Button" 
					ariaLabel="myAriaLabel" 
				/>
			</CardSection>
		</Card>
	);
}

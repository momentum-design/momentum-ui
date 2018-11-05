import React from 'react';
 import {
  Button,
  Popover
} from '@collab-ui/react';
 export default function Default() {
  const medium = (
    <span key="1" style={{ height: '1800px' }}>Popover(height: 1800px)</span>
  );
  const short = (
    <span key="1" style={{ height: '500px' }}>Popover(height: 500px)</span>
  );
  const tall = (
    <span key="1" style={{ height: '3000px' }}>Popover(height: 3000px)</span>
  );
  const wide = (
    <span key="1" style={{ height: '1900px', width: '1600px' }}>Popover(height: 1900px, width: 1600px)</span>
  );
  return (
    <div className='row'>
      <div className="docs-example docs-example--spacing">
        <h3>
          Props
          <p><code className="small">direction=(top-center)</code></p>
          <p><code className="small">isContained=(true)</code></p>
          <p><code className="small">popoverTrigger=(Click)</code></p>
        </h3>
        <Popover
          isContained
          content={tall}
          direction={'top-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Tall' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          direction={'top-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 0 }}
        >
          <Button children='Tall-NoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          showArrow={false}
          direction={'top-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Tall-NoArrow' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          showArrow={false}
          direction={'top-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 0 }}
        >
          <Button children='Tall-NoArrowNoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          direction={'top-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Wide' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={short}
          direction={'top-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Short' ariaLabel='Click' />
        </Popover>
      </div>
      <div className="docs-example docs-example--spacing">
        <h3>
          Props
          <p><code className="small">direction=(right-center)</code></p>
          <p><code className="small">isContained=(true)</code></p>
          <p><code className="small">popoverTrigger=(Click)</code></p>
        </h3>
        <Popover
          isContained
          content={wide}
          direction={'right-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Tall' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          direction={'right-center'}
          popoverTrigger={'Click'}
        >
          <Button children='Wide-NoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          showArrow={false}
          direction={'right-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Wide-NoArrow' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          showArrow={false}
          direction={'right-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 0 }}
        >
          <Button children='Wide-NoArrowNoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          direction={'right-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Wide' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          direction={'right-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Tall' ariaLabel='Click' />
        </Popover>
      </div>
      <div className="docs-example docs-example--spacing">
        <h3>
          Props
          <p><code className="small">direction=(left-center)</code></p>
          <p><code className="small">isContained=(true)</code></p>
          <p><code className="small">popoverTrigger=(Click)</code></p>
        </h3>
        <Popover
          isContained
          content={wide}
          direction={'left-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Tall' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          direction={'left-center'}
          popoverTrigger={'Click'}
        >
          <Button children='Wide-NoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          showArrow={false}
          direction={'left-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Wide-NoArrow' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          showArrow={false}
          direction={'left-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 0 }}
        >
          <Button children='Wide-NoArrowNoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          direction={'left-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Wide' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          direction={'left-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Tall' ariaLabel='Click' />
        </Popover>
      </div>
      <div className="docs-example docs-example--spacing">
         <h3>
          Props
          <p><code className="small">direction=(bottom-center)</code></p>
          <p><code className="small">isContained=(true)</code></p>
          <p><code className="small">popoverTrigger=(Click)</code></p>
        </h3>
        <Popover
          isContained
          content={tall}
          direction={'bottom-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Tall' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          direction={'bottom-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 0 }}
        >
          <Button children='Tall-NoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          showArrow={false}
          direction={'bottom-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Tall-NoArrow' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          showArrow={false}
          direction={'bottom-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 0 }}
        >
          <Button children='Tall-NoArrowNoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          direction={'bottom-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Wide' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={short}
          direction={'bottom-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Short' ariaLabel='Click' />
        </Popover>
      </div>
      <h3>Overflow Container</h3>
      <div
        className="docs-example docs-example--spacing"
        style={{
          border: '2px solid #666666',
          width: '100%',
          height: '500px',
          overflow: 'scroll',
          padding: '125px'
        }}
      >
        <div className="docs-example docs-example--spacing">
          <h3>
            Props
            <p><code className="small">direction=(top-center)</code></p>
            <p><code className="small">isContained=(true)</code></p>
            <p><code className="small">checkOverflow=(true)</code></p>
            <p><code className="small">popoverTrigger=(Click)</code></p>
          </h3>
          <Popover
            isContained
            checkOverflow
            content={tall}
            direction={'top-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Tall' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            direction={'top-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 0 }}
          >
            <Button children='Tall-NoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            showArrow={false}
            direction={'top-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Tall-NoArrow' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            showArrow={false}
            direction={'top-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 0 }}
          >
            <Button children='Tall-NoArrowNoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'top-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Wide' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={short}
            direction={'top-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Short' ariaLabel='Click' />
          </Popover>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            Props
            <p><code className="small">direction=(right-center)</code></p>
            <p><code className="small">isContained=(true)</code></p>
            <p><code className="small">checkOverflow=(true)</code></p>
            <p><code className="small">popoverTrigger=(Click)</code></p>
          </h3>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'right-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Tall' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'right-center'}
            popoverTrigger={'Click'}
          >
            <Button children='Wide-NoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            showArrow={false}
            direction={'right-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Wide-NoArrow' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            showArrow={false}
            direction={'right-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 0 }}
          >
            <Button children='Wide-NoArrowNoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'right-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Wide' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            direction={'right-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Tall' ariaLabel='Click' />
          </Popover>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            Props
            <p><code className="small">direction=(left-center)</code></p>
            <p><code className="small">isContained=(true)</code></p>
            <p><code className="small">checkOverflow=(true)</code></p>
            <p><code className="small">popoverTrigger=(Click)</code></p>
          </h3>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'left-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Tall' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'left-center'}
            popoverTrigger={'Click'}
          >
            <Button children='Wide-NoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            showArrow={false}
            direction={'left-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Wide-NoArrow' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            showArrow={false}
            direction={'left-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 0 }}
          >
            <Button children='Wide-NoArrowNoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'left-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Wide' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            direction={'left-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Tall' ariaLabel='Click' />
          </Popover>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            Props
            <p><code className="small">direction=(bottom-center)</code></p>
            <p><code className="small">isContained=(true)</code></p>
            <p><code className="small">checkOverflow=(true)</code></p>
            <p><code className="small">popoverTrigger=(Click)</code></p>
          </h3>
          <Popover
            isContained
            checkOverflow
            content={tall}
            direction={'bottom-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Tall' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            direction={'bottom-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 0 }}
          >
            <Button children='Tall-NoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            showArrow={false}
            direction={'bottom-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Tall-NoArrow' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            showArrow={false}
            direction={'bottom-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 0 }}
          >
            <Button children='Tall-NoArrowNoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'bottom-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Wide' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={short}
            direction={'bottom-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Short' ariaLabel='Click' />
          </Popover>
        </div>
      </div>
    </div>
  );
}
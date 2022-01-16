import React from 'react';
import Link from 'next/link';


function MtSeriesLinks({ activeIndex }) {
  const MtSeries = [
    {
      title: 'Building an Event Driven .NET Application: The Fundamentals',
      link: '/blog/building-an-event-driven-dotnet-application-the-fundamentals'
    },
    {
      title: 'Building an Event Driven .NET Application: Setting Up MassTransit and RabbitMQ',
      link: '/blog/building-an-event-driven-dotnet-application-setting-up-masstransit-and-rabbitmq'
    },
    {
      title: 'Building an Event Driven .NET Application: Integration Testing Your MassTransit Message Bus',
      link: '/blog/building-an-event-driven-dotnet-application-integration-testing'
    }
  ];
  
  return (
    <ul>
      {MtSeries.map((post, index) => (
          <li key={index}>
            {
              index === activeIndex ? (
                <>{post.title}</>
              ) : (
                <Link href={post.link}>{post.title}</Link>
              )
            }
          </li>
      ))}
    </ul>
  )
}

export {MtSeriesLinks}
